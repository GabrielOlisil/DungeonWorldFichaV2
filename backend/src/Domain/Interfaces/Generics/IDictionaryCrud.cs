namespace backend.Domain.Interfaces.Generics;

public interface IDictionaryCrud<T> where T : class
{
    Task<T?> AddToDbAsync(T entity);
    Task<T?> UpdateInDbAsync(long id, T entity);
    Task<bool> DeleteInDbAsync(long id);
    Task<T?> GetByIdAsync(long id);
    Task<List<T>> GetAllAsync();
}