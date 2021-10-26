export default class JobTracker {

  constructor(args?: { autoEnd?: boolean; }) {
    this.options = {
      ...this.options,
      ...(args ? args : {}),
    };
  }

  public options = {
    autoEnd: false,
  };

  public jobs = {};

  public subscriptions = [];
  
  public addJob = (jobId) => { this.jobs[jobId] = false; };
  public completeJob = (jobId) => { this.jobs[jobId] = true; this.notify(); };
  public subscribe = (cb) => { this.subscriptions.push(cb); };

  public notify = () => {

    const jobCount = Object.keys(this.jobs).length;
    const jobs = Object.keys(this.jobs).map(k => this.jobs[k]);
    const jobsCompleted = jobs.filter(j => j === true).length;
    const jobsWorking = jobs.filter(j => j === false).length;
    const status = jobsWorking === 0 ? "Complete" : "Working";

    if(status === "Complete" && this.options.autoEnd === true) { process.exit(); }
    
    this.subscriptions.map((cb) => cb({ 
      "Jobs": jobCount,
      "Completed": jobsCompleted,
      "Working": jobsWorking,
      "Status": status, 
    }));

  };

}