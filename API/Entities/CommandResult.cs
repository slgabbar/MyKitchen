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

        public void AddError(string error)
        {
            if (ErrorMessages == null)
                ErrorMessages = new List<string> { error };
            else
                ErrorMessages.Add(error);
        }

        public void SetResult(T result)
        {
            Result = result;
        }

        public bool IsFailure => ErrorMessages?.Any() ?? false;
    }
}
