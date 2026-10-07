import { supabase } from '../supabaseClient';

// Returns a signed URL for a file in Supabase Storage
export async function getResumeSignedUrl({ bucket = 'resumes', path = 'resume.pdf', expiresIn = 60 } = {}) {
  const { data, error } = await supabase.storage.from(bucket).createSignedUrl(path, expiresIn);
  if (error) throw error;
  return data.signedUrl;
}

// Fetches the resume as a Blob (useful for downloading or creating an object URL)
export async function fetchResumeBlob(opts = {}) {
  const url = await getResumeSignedUrl(opts);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch resume: ${response.status} ${response.statusText}`);
  }

  return response.blob();
}

// Optional helper: get a public URL if the file is public
export async function getResumePublicUrl({ bucket = 'resumes', path = 'resume.pdf' } = {}) {
  const { data, error } = await supabase.storage.from(bucket).getPublicUrl(path);
  if (error) throw error;
  return data.publicUrl;
}
