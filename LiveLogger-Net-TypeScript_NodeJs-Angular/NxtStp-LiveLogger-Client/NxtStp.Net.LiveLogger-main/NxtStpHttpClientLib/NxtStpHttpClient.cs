using System;
using System.Drawing;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Reflection;
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

        private string baseUrl;

        private string endPoint;

        private readonly string resource;

        private readonly string acceptHeader;

        private bool cloud = false;

        private string DEFAULT_SUBPATH = string.Empty;

        private string DEFAULT_PORT = ":3000";

        private string DEFAULT_PROTOCOL = "http://";

        private string DEFAULT_IP = "127.0.0.1";

        #endregion private Field and Constants

        #region public Events

        /// <inheritdoc cref="INxtStpHttpClient.Responded"/>
        public event EventHandler<EventArgs> Responded;
        #endregion public Events

        #region Constructors

        public NxtStpHttpClient(string ip = "127.0.0.1", string resource = "log", string acceptHeader = "application/json")
        {
            this.Ip = IPAddress.Parse(ip);
            this.resource = resource;
            this.httpClient = new HttpClient();
            this.baseUrl = DEFAULT_PROTOCOL + ip + DEFAULT_PORT;
            this.endPoint = DEFAULT_SUBPATH + resource;
            this.acceptHeader = acceptHeader;
            this.httpClient.BaseAddress = new Uri(this.baseUrl);
            this.httpClient.DefaultRequestHeaders
                .Accept
                .Add(new MediaTypeWithQualityHeaderValue(this.acceptHeader));
            this.Id = Guid.NewGuid();
        }

        #endregion Constructors

        #region public Properties

        /// <inheritdoc cref="INxtStpHttpClient.Ip"/>
        public IPAddress Ip 
        { 
            get; 
            set; 
        } = null;

        /// <inheritdoc cref="INxtStpHttpClient.Id"/>
        public Guid Id { get; }

        /// <inheritdoc cref="INxtStpHttpClient.Metrics"/>
        public NxtStpHttpClientMetrics Metrics { get; set; }

        /// <inheritdoc cref="INxtStpHttpClient.Cloud"/>
        public bool Cloud
        {
            get => this.cloud;
            set
            {
                string port;
                string subPath;
                if (value)
                {
                    port = ":80";
                    subPath = "api/";
                }
                else
                {
                    port = ":3000";
                    subPath = string.Empty;
                }
                this.baseUrl = DEFAULT_PROTOCOL + this.Ip.ToString() + port;
                this.endPoint = subPath + this.resource;
                this.cloud = value;
            }
        }

        #endregion public Properties

        #region public Methods

        /// <inheritdoc cref="INxtStpHttpClient.EndPointPost"/>
        public void EndPointPost(string payload)
        {
            var request = new HttpRequestMessage(HttpMethod.Post, $"{this.baseUrl}/{this.endPoint}");
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
