
// DELETE
export const deletePerson = async (id:string) => {
            alert('Client deleted!');
            const response = await fetch(`http://localhost:8000/clients/${id}`, {
                method: "DELETE",
            })
              const data = await response.json();
              return data;
          }