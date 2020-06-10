import React from 'react';
import Button from '@material-ui/core/Button';
import { logout } from '../controllers/auth';

export default function AdminDashboard() {

  return (
    <div>
      <Button onClick={logout}>Log out</Button>
    </div>
  );
}