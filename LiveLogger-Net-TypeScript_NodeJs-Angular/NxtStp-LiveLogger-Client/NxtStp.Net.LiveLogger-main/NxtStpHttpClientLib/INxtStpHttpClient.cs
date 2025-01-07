using System;

namespace NxtStpHttpClientLib
{
    /// <summary>
    /// Interface for making http post request to node.js NextStep Live logger that forward them to web app using web socket.
    /// </summary>
    public interface INxtStpHttpClient
    {
        #region Events

        /// <summary>
        /// Raised when a response is received after a post request.
        /// </summary>
        event EventHandler<EventArgs> Responded;

        #endregion Events

        #region Properties

        /// <summary>
        /// Provide an unique identifier of the logger.
        /// </summary>
        Guid Id { get; }

        /// <summary>
        /// Metrics specific to the logger itself, i.e. evaluate performance hit.
        /// </summary>
        NxtStpHttpClientMetrics Metrics { get; set; }

        /// <summary>
        /// If true, http request is made on port 80 and on the endpoint /api.
        /// </summary>
        bool Cloud { get; set; }

        #endregion Properties

        #region Methods

        /// <summary>
        /// Post endpoint
        /// </summary>
        /// <param name="payload">typically a message to be log as JSON string (application/json) or plain text (text/plain)</param>
        void EndPointPost(string payload);

        #endregion Methods
    }
}