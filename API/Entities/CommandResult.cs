using API.Dtos;

namespace API.Services
{
    public class CommandResult<T>
    {
        public List<string>? ErrorMessages { get; set; }
        public T? Result { get; set; }

        public CommandResult() { }

        public CommandResult(T result)
        {
            Result = result;
        }

        public CommandResult(params string[] errorMessages)
        {
            ErrorMessages = errorMessages.ToList();
        }

        public bool IsFailure => (ErrorMessages?.Any() ?? false);
    }
}
