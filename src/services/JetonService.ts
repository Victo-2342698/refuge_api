import UserService from './UserService';
import jwt from 'jsonwebtoken';

async function generateToken({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  console.log('LOGIN EMAIL REÇU:', email);
  console.log('LOGIN PASSWORD REÇU:', password);

  const user = await UserService.getByEmail(email);
  console.log('USER TROUVÉ:', user);

  if (!user) {
    console.log('❌ USER NON TROUVÉ');
    return null;
  }

  if (password !== user.password) {
    console.log('❌ MOT DE PASSE INCORRECT');
    return null;
  }

  console.log('✅ AUTH OK');

  return jwt.sign(
    { email: user.email, name: user.name },
    process.env.JWTSECRET as string,
    { expiresIn: '1h' },
  );
}

export default { generateToken };
