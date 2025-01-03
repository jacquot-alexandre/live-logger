using System.Threading;

namespace NxtStpHttpClientLib
{
    /// <summary>
    /// Add a http client to the base functionality of <see cref=" NxtStpHttpPerformanceLogBase"/>
    /// </summary>
    public class NxtStpHttpPerformanceLog : NxtStpHttpPerformanceLogBase
    {
        #region Constructor

        /// <summary>
        /// The constructor.
        /// </summary>
        public NxtStpHttpPerformanceLog() : base()
        {
            //
        }

        #endregion Constructor

        #region virtual abstract

        public virtual void BeginLog(params object[] objects)
        {
            this.MessagesDictionary.Clear();
            this.M0 = this.PerformanceStopWatchElapsed();
#pragma warning disable CA1305
            this.MessagesDictionary.Add("Managed thread Id", Thread.CurrentThread.ManagedThreadId.ToString());
#pragma warning restore CA1305
            this.MessagesDictionary.Add("Time stamp at BeginLog", this.GetTime());
        }

        #endregion virtual abstract

        #region public Methods

        public virtual void EndLog(params object[] objects)
        {  
            this.MessagesDictionary.Add("Time stamp at EndLog", this.GetTime());
            this.M1 = this.PerformanceStopWatchElapsed();
            this.MessagesDictionary.Add("Execution duration [s]", this.MicroSecondsToSeconds(this.Diff(this.M0, this.M1)));
            
            if (this.Metrics != null)
            {
                this.EndPointPost(this.DictToJsonString(this.Metrics.MergeDictionaries(this.MessagesDictionary, this.Metrics.MetricsDictionary)));
            }
            else
            {
                this.EndPointPost(this.DictToJsonString(this.MessagesDictionary));
            }
        }

        #endregion public Methods
    }
}
