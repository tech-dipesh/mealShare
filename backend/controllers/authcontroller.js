import {supabase} from '../config/supabase.js';
import transporter from '../config/email.js';
import { signToken } from '../config/jwt.js';
import bcrypt from 'bcrypt';
import { verifyToken } from '../config/jwt.js';
export const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  const { data: existing, error: existErr } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .single();
  if (existing) return res.status(400).json({ message: 'Email already in use' });
  const password_hash = await bcrypt.hash(password, 10);
  const { data, error } = await supabase
    .from('users')
    .insert({ name, email, password_hash })
    .select()
    .select();
  if (error) return next(error);
  const token = signToken({ id: data.id });
  await transporter.sendMail({
    to: email,
    subject: 'Verify your email',
    text: `Click to verify: ${process.env.FRONTEND_URL}/verify/${token}`,
  });
  res.status(201).json({ message: 'Registration successful, check email' });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const { data: user, error, status } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();
  if (error && status === 406) return res.status(400).json({ message: 'User not found' });
  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) return res.status(400).json({ message: 'Invalid credentials' });
  const token = signToken({ id: user.id });
  res.json({ token });
};


export const verifyEmail = async (req, res, next) => {
  try {
    const payload = verifyToken(req.params.token)
    await supabase.from('users').update({ email_verified: true }).eq('id', payload.id)
    res.json({ message: 'Email verified' })
  } catch (error) {
    next(error)
  }
}

export const resetPassword = async (req, res, next) => {
  const { email } = req.body
  const { data: user, error: findErr } = await supabase.from('users').select('id').eq('email', email).single()
  if (findErr || !user) return res.status(400).json({ message: 'Email not found' })
  const token = signToken({ id: user.id })
  await transporter.sendMail({
    to: email,
    subject: 'Reset your password',
    text: `${process.env.FRONTEND_URL}/reset/${token}`
  })
  res.json({ message: 'Password reset email sent' })
}