using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using backend.Extensions.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.Application.Endpoints;

public class AuthEndpoints
{
    public record LoginRequest(string Username, string Password);
    
    public record LoginResponse
    {
        [JsonPropertyName("access_token")]
        public string AccessToken { get; set; }
        [JsonPropertyName("expires_in")]
        public int ExpiresIn { get; set; }
        [JsonPropertyName("refresh_expires_in")]
        public int RefreshExpiresIn { get; set; }
        [JsonPropertyName("refresh_token")]
        public string RefreshToken { get; set; }
        [JsonPropertyName("token_type")]
        public string TokenType { get; set; }
        [JsonPropertyName("id_token")]
        public string IdToken { get; set; }
        [JsonPropertyName("not_before_policy")]
        public int NotBeforePolicy { get; set; }
        [JsonPropertyName("session_state")]
        public string SessionState { get; set; }
        [JsonPropertyName("scope")]
        public string Scope { get; set; }
    }

    public static async Task<IResult> Login([FromKeyedServices("keycloak")] HttpClient httpClient,
        ILogger<AuthEndpoints> logger, LoginRequest loginRequest)
    {

        if (string.IsNullOrWhiteSpace(loginRequest.Username) || string.IsNullOrWhiteSpace(loginRequest.Password))
        {
            return TypedResults.Json(
                new ResponseInterface<string>(true, "Invalid Username or Password", null),
                statusCode: StatusCodes.Status403Forbidden);
        }
        
        using var content = new FormUrlEncodedContent([
            new KeyValuePair<string, string>("client_id", "dungeon_client"),
            new KeyValuePair<string, string>("client_secret", "ZNtl4J7vXGlW0hczQ83IvprYc8Bnu5I5"), //alterar depois
            new KeyValuePair<string, string>("scope", "openid"),
            new KeyValuePair<string, string>("grant_type", "password"),
            new KeyValuePair<string, string>("username", loginRequest.Username),
            new KeyValuePair<string, string>("password", loginRequest.Password)
        ]);
        
        content.Headers.ContentType = new MediaTypeHeaderValue("application/x-www-form-urlencoded");


        using var response =
            await httpClient.PostAsync("/realms/Dungeon%20World/protocol/openid-connect/token", content);

        if (!response.IsSuccessStatusCode)
        {
            return TypedResults.Json(
                new ResponseInterface<string>(true, "Invalid Username or Password", null),
                statusCode: StatusCodes.Status403Forbidden);
        }
        
        var jsonOptions = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true // Ignora a diferença de maiúsculas/minúsculas
        };
        
        var json = await response.Content.ReadFromJsonAsync<LoginResponse>(jsonOptions);

        return TypedResults.Json(
            new ResponseInterface<LoginResponse>(true, "Login successful.", json),
            statusCode: StatusCodes.Status200OK, contentType: "application/json");
    }
}