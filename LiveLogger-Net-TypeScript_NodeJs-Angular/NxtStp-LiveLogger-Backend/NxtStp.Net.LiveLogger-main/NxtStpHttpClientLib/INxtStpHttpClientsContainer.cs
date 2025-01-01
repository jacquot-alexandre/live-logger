namespace NxtStpHttpClientLib
{
    /// <summary>
    /// Thread safe container of Threads.
    /// </summary>
    public interface INxtStpHttpClientsContainer<in TInstanceIndexType>
    {
        /// <summary>
        /// Get a http instance specific to a thread context.
        /// </summary>
        /// <typeparam name="T">NxtStpHttpClient instance are stored in a dictionary that use an index of type T</typeparam>
        /// <returns>an http instance</returns>
        INxtStpHttpClient GetHttp<T>(TInstanceIndexType instanceIndexType) where T : INxtStpHttpClient, new();
    }
}
