namespace backend.Extensions.Application.Interfaces;

public record ResponseInterface<T>(bool success, string message, T? data = default) { }