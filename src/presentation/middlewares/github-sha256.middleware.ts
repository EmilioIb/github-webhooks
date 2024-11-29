import { envs } from '../../config';
import { NextFunction, Request, Response } from 'express';
import * as crypto from 'crypto';

const SECRET_TOKEN = envs.SECRET_TOKEN;

const encoder = new TextEncoder();

async function verifySignature(secret: string, header: string, payload: any) {
  if (!header) return false;
  const parts = header.split('=');
  const sigHex = parts[1];

  const algorithm = { name: 'HMAC', hash: { name: 'SHA-256' } };

  const keyBytes = encoder.encode(secret);
  const extractable = false;
  const key = await crypto.subtle.importKey('raw', keyBytes, algorithm, extractable, ['sign', 'verify']);

  const sigBytes = hexToBytes(sigHex);
  const dataBytes = encoder.encode(payload);
  const equal = await crypto.subtle.verify(algorithm.name, key, sigBytes, dataBytes);

  return equal;
}

function hexToBytes(hex: string) {
  const len = hex.length / 2;
  const bytes = new Uint8Array(len);

  let index = 0;
  for (let i = 0; i < hex.length; i += 2) {
    const c = hex.slice(i, i + 2);
    const b = parseInt(c, 16);
    bytes[index] = b;
    index += 1;
  }

  return bytes;
}

export class GithubMiddlewareSha256 {
  static verifySignature = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const signature = req.header('x-hub-signature-256') || '';
      const body = JSON.stringify(req.body);

      const isValidsender = await verifySignature(SECRET_TOKEN, signature, body);

      isValidsender ? next() : res.status(401).send('Unauthorized');
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}
