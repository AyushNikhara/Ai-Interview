'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-blue-600 mb-4 animate-fadeIn">
          Mock Interview
        </h1>
        <p className="text-lg text-gray-600 animate-fadeIn delay-200">
          Prepare for your interviews with AI-generated questions and answers.
        </p>
      </div>

      {/* Image Section */}
      <div className="mb-10 flex flex-row items-center justify-center space-x-6 animate-slideInUp">
        <Image
          src={'/office-kantor.gif'}
          width={400}
          height={200}
          alt="Office illustration"
          className="rounded-lg shadow-lg transition-transform duration-500 hover:scale-105"
        />
        <Image
          src={'/job-interview-hero.png'}
          width={400}
          height={200}
          alt="Job Interview Hero"
          className="rounded-lg shadow-lg transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Button Section */}
      <div className="animate-bounce mt-10">
        <Link href="/dashboard/">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg rounded-lg shadow-lg transition-transform hover:scale-105">
            Start Interview
          </Button>
        </Link>
      </div>
    </div>
  );
}
