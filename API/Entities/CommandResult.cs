using API.Dtos;
using System.Collections;

namespace API.Services
{
    public abstract class QueryAsync<T>
    {
        protected abstract Task<bool> VerifyPrerequisiteDataAsync();

        protected abstract Task<bool> VerifyAccessAsync();
    }

    public abstract class QuerySingleAsync<T> : QueryAsync<T>
    {
        protected abstract Task<T> ExecuteQueryAsync();

        public async Task<QueryResultSingle<T>> ExecuteAsync()
        {
            var queryResult = new QueryResultSingle<T>();

            queryResult.PrerequisiteDataFound = await VerifyPrerequisiteDataAsync();
            if (!queryResult.PrerequisiteDataFound)
                return queryResult;

            queryResult.CanAccess = await VerifyAccessAsync();
            if (!queryResult.CanAccess)
                return queryResult;

            queryResult.Result = await ExecuteQueryAsync();

            return queryResult;
        }
    }

    public abstract class QueryMultipleAsync<T> : QueryAsync<T>
    {
        protected abstract Task<IEnumerable<T>> ExecuteQueryAsync();

        public async Task<QueryResultMultiple<T>> ExecuteAsync()
        {
            var queryResult = new QueryResultMultiple<T>();

            queryResult.PrerequisiteDataFound = await VerifyPrerequisiteDataAsync();
            if (!queryResult.PrerequisiteDataFound)
                return queryResult;

            queryResult.CanAccess = await VerifyAccessAsync();
            if (!queryResult.CanAccess)
                return queryResult;

            queryResult.Result = await ExecuteQueryAsync();

            return queryResult;
        }
    }
    
    public class QueryResult
    {
        public bool PrerequisiteDataFound { get; set; }
        public bool CanAccess { get; set; }

        public QueryResult()
        {
        }
    }

    public class QueryResultSingle<T> : QueryResult
    {
        public T? Result { get; set; }

        public QueryResultSingle() : base()
        {
        }
    }

    public class QueryResultMultiple<T> : QueryResult
    {
        public IEnumerable<T>? Result { get; set; }

        public QueryResultMultiple() : base()
        {

        }
    }

    public class QueryResult<T> : QueryResult
    {
        public T? Result { get; set; }

        public QueryResult() : base ()
        {

        }

        public QueryResult(T result)
        {
            Result = result;
        }
    }

    public abstract class CommandAsync<T>
    {
        protected abstract Task<bool> VerifyPrerequisiteDataAsync();

        protected abstract Task<bool> VerifyAccessAsync();

        protected abstract Task<FluentValidation.Results.ValidationResult> ValidateAsync();

        protected abstract Task<T> ExecuteCommandAsync();

        public async Task<CommandResult<T>> ExecuteAsync()
        {
            var commandResult = new CommandResult<T>();

            commandResult.PrerequisiteDataFound = await VerifyPrerequisiteDataAsync();
            if (!commandResult.PrerequisiteDataFound)
                return commandResult;

            commandResult.CanAccess = await VerifyAccessAsync();
            if (!commandResult.CanAccess)
                return commandResult;

            commandResult.ValidationResult = await ValidateAsync();
            if (!commandResult.ValidationResult.IsValid)
                return commandResult;

            commandResult.Result = await ExecuteCommandAsync();

            return commandResult;
        }
    }

    public class CommandResult
    {
        public bool PrerequisiteDataFound { get; set; }
        public bool CanAccess { get; set; }
        public FluentValidation.Results.ValidationResult? ValidationResult { get; set; }

        public CommandResult()
        {
        }

        public CommandResult(FluentValidation.Results.ValidationResult validationResult)
        {
            ValidationResult = validationResult;
        }

        public CommandResult(params string[] errorMessages)
        {
            ValidationResult = new FluentValidation.Results.ValidationResult(
                errorMessages.Select(e => new FluentValidation.Results.ValidationFailure("", e))
            );
        }

        public bool IsSuccess => ValidationResult?.IsValid ?? true;
        public bool IsFailure => !IsSuccess;
    }

    public class CommandResult<T> : CommandResult
    {
        public T? Result { get; set; }

        public CommandResult() : base()
        {
        }

        public CommandResult(T result)
        {
            Result = result;
        }

        public CommandResult(FluentValidation.Results.ValidationResult validationResult) : base(validationResult)
        {
        }

        public CommandResult(params string[] errorMessages) : base(errorMessages)
        {
        }
    }
}
