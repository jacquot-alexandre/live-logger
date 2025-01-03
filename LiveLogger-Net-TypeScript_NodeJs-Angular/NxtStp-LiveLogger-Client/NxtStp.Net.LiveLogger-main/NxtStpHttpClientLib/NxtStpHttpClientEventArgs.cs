using System;

namespace NxtStpHttpClientLib
{
    /// <summary>
    /// Event args intended for use with NextStep Http Client.
    /// </summary>
    public class NxtStpHttpClientEventArgs : EventArgs
    {
        #region Constructor

        /// <summary>
        /// The constructor
        /// </summary>
        /// <param name="responseContent"></param>
        public NxtStpHttpClientEventArgs(string responseContent)
        {
            this.Content = responseContent;
        }

        #endregion Constructor

        #region public Properties

        /// <summary>
        /// Response content
        /// </summary>
        public string Content { get; set; }

        #endregion public Properties
    }
}
