import axios from 'axios';
import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

export default function Contact() {
  const { contactId } = useParams();
  const history = useHistory();

  const { data: contact, isLoading } = useQuery({
    queryKey: ['contact', contactId],
    queryFn: () =>
      axios
        .get(
          `https://65b36193770d43aba479a2f2.mockapi.io/users/${contactId}`
        )
        .then((res) => res.data),
  });

  const handleDelete = () => {
    axios
      .delete(
        `https://65b36193770d43aba479a2f2.mockapi.io/users/${contactId}`
      )
      .then(() => {
        history.push('/');
      });
  };

  if (isLoading) return 'loading';

  return (
    <div id="contact">
      <div>
        <img
          key={contact.avatar}
          src={contact.avatar || null}
          alt="avatar"
        />
      </div>

      <div>
        <h1 data-testid="full_name">
          {contact.first_name || contact.last_name ? (
            <>
              {contact.first_name} {contact.last_name}
            </>
          ) : (
            <i>No Name</i>
          )}
        </h1>

        {contact.email && (
          <p>
            <a target="_blank" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
          </p>
        )}

        {contact.description && <p>{contact.description}</p>}

        <div>
          <button className="delete" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
