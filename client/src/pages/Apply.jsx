import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { createApplication, getJob } from '../services/api';

export default function Apply() {
  const { id } = useParams();
  const nav = useNavigate();

  const [job, setJob] = useState(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const [resume, setResume] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getJob(id)
      .then(setJob)
      .catch(err => setError(err.message));
  }, [id]);

  const change = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleResume = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setResume(null);
      return;
    }

    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (!allowedTypes.includes(file.type)) {
      setError('Please upload a PDF, DOC or DOCX file.');
      e.target.value = '';
      setResume(null);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Resume must be smaller than 5 MB.');
      e.target.value = '';
      setResume(null);
      return;
    }

    setError('');
    setResume(file);
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      setError('');

      const data = new FormData();

      data.append('jobId', id);
      data.append('name', form.name);
      data.append('email', form.email);
      data.append('phone', form.phone);

      if (resume) {
        data.append('resume', resume);
      }

      await createApplication(data);

      nav('/applications');
    } catch (err) {
      setError(err.message);
    }
  };

  if (!job) {
    return <p className="state">Loading...</p>;
  }

  return (
    <section className="page narrow">
      <span className="eyebrow">APPLICATION FORM</span>

      <h2>Apply for {job.title}</h2>

      <p>
        {job.company} • {job.location}
      </p>

      <form onSubmit={submit} className="form">

        <label>
          Full Name
          <input
            name="name"
            value={form.name}
            onChange={change}
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={change}
            required
          />
        </label>

        <label>
          Phone
          <input
            name="phone"
            value={form.phone}
            onChange={change}
            required
          />
        </label>

        <label>
          Resume
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleResume}
            required
          />
        </label>

        <small>
          Accepted formats: PDF, DOC, DOCX • Maximum size: 5 MB
        </small>

        {resume && (
          <p>
            Selected: <strong>{resume.name}</strong>
          </p>
        )}

        {error && (
          <p className="error">
            {error}
          </p>
        )}

        <button className="button" type="submit">
          Submit Application
        </button>

      </form>

      <Link to={`/jobs/${id}`}>
        ← Back to job
      </Link>
    </section>
  );
}