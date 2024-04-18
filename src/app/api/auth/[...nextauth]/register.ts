import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function register(req: NextApiRequest, res: NextApiResponse) {
    const { email, password, retypePassword, firstName, lastName } = req.body;

    if (!email || !password || !firstName || !lastName) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if(password !== retypePassword) {
        return res.status(400).json({ message: "Passwords do not match!" });
    }

    try {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                firstName,
                lastName
            },
        });

        return res.status(201).json({ message: "Account created successfully", user });

    } catch (error: any) {
        if (error.code === "P2002") {
            return res.status(409).json({ message: "Email already in use" });
        } else {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}
