//GET

export const getClientById = async (id:string) => {
      const response =  await fetch(`http://localhost:8000/clients/${id}`)
      const data =  await response.json();
      return data;
    }

// DELETE
export const deletePerson = async (id:string) => {
            alert('Client deleted!');
            const response = await fetch(`http://localhost:8000/clients/${id}`, {
                method: "DELETE",
            })
              const data = await response.json();
              return data;
          }

export const deleteOrder = async (id:string) => {
            alert('Order deleted!');
            const response = await fetch(`http://localhost:8000/orders/${id}`, {
                method: "DELETE",
            })
              const data = await response.json();
              return data;
}