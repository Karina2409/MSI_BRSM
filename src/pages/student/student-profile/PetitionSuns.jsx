import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./profile-page.css";

const PetitionSuns = ({ studentId }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchPetitionCount = async () => {
      try {
        const petitionEventsResponse = await axios.get(`http://localhost:8080/students/student/${studentId}/petition-events-count`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (petitionEventsResponse.status === 200) {
          setCount(petitionEventsResponse.data);
        } else {
          console.error('Failed to fetch petition events count');
        }
      } catch (error) {
        console.error('Error fetching petition events count:', error);
      }
    };

    fetchPetitionCount();
  }, [studentId]);

  const suns = [];
  for (let i = 0; i < 5; i++) {
    suns.push(
      <span key={i} className={`material-symbols-outlined sun ${i < count ? 'yellow' : 'gray'}`}>
        clear_day
      </span>
    );
  }

  return <div className="petition-suns">{suns}</div>;
};

export default PetitionSuns;