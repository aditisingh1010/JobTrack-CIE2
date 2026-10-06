import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (_req, file, cb) => {
    const allowed = ['.pdf', '.doc', '.docx'];
    const ext = path.extname(file.originalname).toLowerCase();

    if (allowed.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF, DOC and DOCX files are allowed'));
    }
  },
});

const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(uploadDir));

let jobs = [
  {
    id: 'j1',
    title: 'Frontend Developer Intern',
    company: 'TechNova',
    location: 'Bengaluru',
    type: 'Internship',
    salary: '₹20,000/month',
    description: 'Build responsive React interfaces and reusable components.',
  },
  {
    id: 'j2',
    title: 'Junior Full Stack Developer',
    company: 'CloudWorks',
    location: 'Hyderabad',
    type: 'Full Time',
    salary: '₹5–7 LPA',
    description: 'Work with React, Node.js and REST APIs on web products.',
  },
  {
    id: 'j3',
    title: 'UI Developer',
    company: 'DesignHub',
    location: 'Remote',
    type: 'Full Time',
    salary: '₹4–6 LPA',
    description: 'Create accessible interfaces from design specifications.',
  },
  {
    id: 'j4',
    title: 'Backend Developer Intern',
    company: 'DataBridge',
    location: 'Pune',
    type: 'Internship',
    salary: '₹18,000/month',
    description: 'Develop Express APIs and work with structured application data.',
  },
];

let applications = [
  {
    id: 'a1',
    jobId: 'j1',
    name: 'Aarav Sharma',
    email: 'aarav@example.com',
    phone: '9876543210',
    resume: 'aarav_resume.pdf',
    status: 'Applied',
    appliedAt: '2026-10-05',
  },
  {
    id: 'a2',
    jobId: 'j2',
    name: 'Meera Nair',
    email: 'meera@example.com',
    phone: '9876501234',
    resume: 'meera_resume.pdf',
    status: 'Interview',
    appliedAt: '2026-10-04',
  },
];

app.get('/api/health', (_req, res) => {
  res.json({ success: true, message: 'JobTrack API is running' });
});

app.get('/api/jobs', (_req, res) => {
  res.json({ success: true, count: jobs.length, data: jobs });
});

app.get('/api/jobs/:id', (req, res) => {
  const job = jobs.find((j) => j.id === req.params.id);
  if (!job) {
    return res.status(404).json({ success: false, message: 'Job not found' });
  }

  res.json({ success: true, data: job });
});

app.get('/api/applications', (_req, res) => {
  res.json({ success: true, count: applications.length, data: applications });
});

app.post('/api/applications', upload.single('resume'), (req, res) => {
  const { jobId, name, email, phone } = req.body;

  if (!jobId || !name || !email || !phone) {
    return res.status(400).json({
      success: false,
      message: 'Name, email, phone and job are required',
    });
  }

  if (!jobs.some((j) => j.id === jobId)) {
    return res.status(404).json({
      success: false,
      message: 'Job not found',
    });
  }

  const application = {
    id: 'a' + Date.now(),
    jobId,
    name,
    email,
    phone,
    resume: req.file ? req.file.filename : 'Not provided',
    resumeOriginalName: req.file ? req.file.originalname : '',
    status: 'Applied',
    appliedAt: new Date().toISOString().slice(0, 10),
  };

  applications.unshift(application);

  res.status(201).json({
    success: true,
    message: 'Application submitted successfully',
    data: application,
  });
});

app.put('/api/applications/:id', (req, res) => {
  const application = applications.find((a) => a.id === req.params.id);
  if (!application) {
    return res.status(404).json({ success: false, message: 'Application not found' });
  }

  const allowed = ['Applied', 'Interview', 'Selected', 'Rejected'];
  if (req.body.status && !allowed.includes(req.body.status)) {
    return res.status(400).json({ success: false, message: 'Invalid status' });
  }

  Object.assign(application, req.body);

  res.json({
    success: true,
    message: 'Application updated',
    data: application,
  });
});

app.delete('/api/applications/:id', (req, res) => {
  const index = applications.findIndex((a) => a.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Application not found' });
  }

  applications.splice(index, 1);
  res.json({ success: true, message: 'Application deleted' });
});

app.listen(PORT, () => {
  console.log(`JobTrack API running on http://localhost:${PORT}`);
});
