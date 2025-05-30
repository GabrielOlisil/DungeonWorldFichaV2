using System.Data.Common;
using backend.Application.Wrappers;
using Microsoft.EntityFrameworkCore;

namespace backend.Application.Helpers;

public static class ErrorHandler
{
    public static async Task<IResult> HandleErrorWithNoLogAsync(Func<Task<IResult>> requestFunctions)
    {
        try
        {
            return await requestFunctions();
        }
        catch (DbUpdateException e)
        {
            return TypedResults.Json(
                new ResponseWrapper<string>(false, "Erro ao inserir elementos no banco de dados", null),
                statusCode: StatusCodes.Status400BadRequest
            );
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);

            return TypedResults.Json(
                new ResponseWrapper<string>(false, $"Erro interno", null),
                statusCode: StatusCodes.Status500InternalServerError
            );
        }
    }
}