import { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabaseClient';

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function fetchAppointments() {
      const { data } = await supabase.from('appointments').select('*, services(*), professionals(name)');
      setAppointments(data);
    }
    fetchAppointments();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      {appointments.map((a) => (
        <div key={a.id} className="border p-4 mb-2">
          <p>Client ID: {a.user_id}</p>
          <p>Salon: {a.professionals.name}</p>
          <p>Prestation: {a.services.name}</p>
          <p>Date: {a.date}</p>
          <p>Status: {a.status}</p>
        </div>
      ))}
    </div>
  );
}