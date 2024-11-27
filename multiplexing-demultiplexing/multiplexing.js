const app = require("express")();

const jobs = {};

app.get("/", (req, res) => {
    res.end("hello");
})

app.post("/submit", (req, res) => {
    const jobId = `job:${Date.now()}`;
    jobs[jobId] = 0;
    updateJob(jobId, 0);
    res.end("\n\n" + jobId + "\n\n");
})

app.get("/checkstatus", async (req, res) => {
    console.log(jobs[req.query.jobId]);

    while(await checkJobComplete(req.query.jobId) == false);
    res.end("\n\nJobStatus: " + jobs[req.query.jobId] + "%\n\n");
})

const checkJobComplete = async (jobId) => {
    return new Promise( (resolve, reject) => {
        if(jobs[jobId] < 100){
            setTimeout(() => resolve(false), 5000);
        }else{
            resolve(true);
        }
    })
}

const updateJob = (jobId, progress) => {
    jobs[jobId] = progress;
    console.log(`update ${jobId} to ${progress}`);
    if(progress === 100) return;
    setTimeout(() => updateJob(jobId, progress + 10), 3000);
}

app.listen(8080, () => console.log("listening on 8080"));

// fetch("http://localhost:8080/submit", {method: "POST"}).then(a => a.text).then(console.log)
// fetch("http://localhost:8080/checkstatus?jobId=${jobId}", {method: "GET"}).then(a => a.text).then(console.log)