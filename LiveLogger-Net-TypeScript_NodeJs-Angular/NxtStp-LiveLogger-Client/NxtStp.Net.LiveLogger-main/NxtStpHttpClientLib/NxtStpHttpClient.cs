using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace NxtStpHttpClientLib
{
    /// <summary>
    /// Simple http client to log message to a web server.
    /// Typically used for debugging application.
    /// </summary>
    public class NxtStpHttpClient : INxtStpHttpClient
    {
        #region private Field and Constants

        private readonly HttpClient httpClient;

        private readonly string baseUrl;

        private readonly string resource;

        private readonly string acceptHeader;

        #endregion private Field and Constants

        #region public Events

        /// <inheritdoc cref="INxtStpHttpClient.Responded"/>
        public event EventHandler<EventArgs> Responded;
        #endregion public Events

        #region Constructors

        public NxtStpHttpClient(string baseUrl = "http://127.0.0.1:3000", string resource = "log", string acceptHeader = "application/json")
        {
            this.httpClient = new HttpClient();
            this.baseUrl = baseUrl;
            this.resource = resource;
            this.acceptHeader = acceptHeader;
            this.httpClient.BaseAddress = new Uri(this.baseUrl);
            this.httpClient.DefaultRequestHeaders
                .Accept
                .Add(new MediaTypeWithQualityHeaderValue(this.acceptHeader));
            this.Id = Guid.NewGuid();
        }

        #endregion Constructors

        #region public Properties

        /// <inheritdoc cref="INxtStpHttpClient.Id"/>
        public Guid Id { get; }

        /// <inheritdoc cref="INxtStpHttpClient.Metrics"/>
        public NxtStpHttpClientMetrics Metrics { get; set; }

        #endregion public Properties

        #region public Methods

        /// <inheritdoc cref="INxtStpHttpClient.EndPointPost"/>
        public void EndPointPost(string payload)
        {
            var request = new HttpRequestMessage(HttpMethod.Post, $"{this.baseUrl}/{this.resource}");
            request.Content = new StringContent(payload,
                Encoding.UTF8,
                this.acceptHeader);
            httpClient.SendAsync(request).ContinueWith(TaskFinished);
        }

        #endregion public Methods

        #region private Methods

        private async void TaskFinished(Task<HttpResponseMessage> responseMessage)
        {
            try
            {
                var responseContent = await responseMessage.Result.Content.ReadAsStringAsync();
                this.Responded?.Invoke(this, new NxtStpHttpClientEventArgs(responseContent));
            }
            catch (Exception)
            {
                this.Responded?.Invoke(this, new NxtStpHttpClientEventArgs("Error"));
            }
        }

        #endregion private Methods

    }
}
