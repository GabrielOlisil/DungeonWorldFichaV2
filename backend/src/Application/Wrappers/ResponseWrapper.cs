namespace backend.Application.Wrappers;

public record ResponseWrapper<T>(bool success, string message, T? data = default) { }