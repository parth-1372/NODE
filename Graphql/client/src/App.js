import { gql, useQuery } from '@apollo/client';

const query = gql`
  query GetTodos {
    getTodos {
      title
      id
      user {
        name
        email
        phone
      }
    }
  }
`;

function DisplayTodos() {
  const { loading, error, data } = useQuery(query);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Ensure data and data.getTodos are defined
  if (!data || !data.getTodos) return <p>No todos found</p>;

  return data.getTodos.map(({ id, title, user }) => (
    <div key={id} className='ml-3'>
      {title && <h3>{title}</h3>}
      <br />
      <b>About this User:</b>
      {user && (
        <>
          {user.name && <p>{user.name}</p>}
          {user.email && <p>{user.email}</p>}
          {user.phone && <p>{user.phone}</p>}
        </>
      )}
      <br />
    </div>
  ));
}

export default function App() {
  return (
    <div>
      <h2>My first Apollo app 🚀</h2>
      <br />
      <DisplayTodos />
    </div>
  );
}
