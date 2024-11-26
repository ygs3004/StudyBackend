const app = require("express")();
const jobs = {};

app.post("/submit", (req, res) => {
    const jobId = `job:${Date.now()}`;
    jobs[jobId] = 0;
    updateJob(jobId, 0);
    res.end("\n\n" + jobId + "\n\n");;
})

app.get("/checkstatus", (req, res) => {
    console.log(jobs[req.query.jobId]);
    res.end("\n\nJobStatus: " + jobs[req.query.jobId] + "%\n\n");
})

const updateJob = (jobId, progress) => {
    jobs[jobId] = progress;
    console.log(`update ${jobId} to ${progress}`);
    if(progress === 100) return;
    setTimeout(() => updateJob(jobId, progress + 10), 3000);
}

app.listen(8080, () => console.log("listening on 8080"));