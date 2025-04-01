FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /App

# Copy everything
COPY ./src/backend.csproj ./backend.csproj
# Restore as distinct layers
RUN dotnet restore

COPY ./src ./

# Build and publish a release
RUN dotnet publish -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /App
COPY --from=build /App/out .

EXPOSE 8080
ENTRYPOINT ["dotnet", "backend.dll"]
