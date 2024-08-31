import { FiTrash } from 'react-icons/fi';
import { useEffect, useState, useRef, FormEvent } from 'react';
import { api } from './services/api';

interface CustomerProps {
  id: string;
  name: string;
  email: string;
  status: boolean;
  created_at: string; 
}

export default function App() {
  const [customers, setCustomers] = useState<CustomerProps[]>([]);

  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    loadCustomers();
  }, []);

  async function loadCustomers() {
    try {
      const response = await api.get("/customer");
      setCustomers(response.data);
    } catch (error) {
      console.error("Erro ao carregar os clientes:", error);
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!nameRef.current?.value || !emailRef.current?.value) return;

    try {
      const response = await api.post("/customer", {
        name: nameRef.current.value,
        email: emailRef.current.value,
      });

      setCustomers(allCustomers => [...allCustomers, response.data]);

      // Limpar os campos de entrada após o envio
      nameRef.current.value = "";
      emailRef.current.value = "";
    } catch (error) {
      console.error("Erro ao cadastrar cliente:", error);
    }
  }

  async function handleDelete(id: string) {
    try {
      await api.delete("/customer", {
        params: { id },
      });

      const updatedCustomers = customers.filter(customer => customer.id !== id);
      setCustomers(updatedCustomers);
    } catch (error) {
      console.error("Erro ao deletar cliente:", error);
    }
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Data inválida";
    }
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

  return (
    <div className="w-full min-h-screen bg-gray-900 flex justify-center px-4">
      <main className="my-10 w-full md:max-w-2xl">
        <h1 className="text-4xl font-medium text-white">Clientes</h1>

        <form className="flex flex-col my-6" onSubmit={handleSubmit}>
          <label className="font-medium text-white">Nome:</label>
          <input
            type="text"
            placeholder="Digite um nome"
            className="w-full mb-5 p-2 rounded"
            ref={nameRef}
          />
          <label className="font-medium text-white">Email:</label>
          <input
            type="email"
            placeholder="Digite um email..."
            className="w-full mb-5 p-2 rounded"
            ref={emailRef}
          />
          <input
            type="submit"
            value="Cadastrar"
            className="cursor-pointer w-full p-2 bg-green-700 font-medium text-white"
          />
        </form>

        <section className="flex flex-col">
          {customers.map((customer) => (
            <article
              key={customer.id}
              className="w-full bg-white rounded p-2 relative my-3 hover:scale-105 duration-200"
            >
              <p><span className="font-medium">Nome:</span> {customer.name}</p>
              <p><span className="font-medium">Email:</span> {customer.email}</p>
              <p><span className="font-medium">Status:</span> {customer.status ? "ATIVO" : "INATIVO"}</p>
              <p><span className="font-medium">Data:</span> {formatDate(customer.created_at)}</p>
              <button
                onClick={() => handleDelete(customer.id)}
                className="bg-red-500 w-7 h-7 flex items-center justify-center rounded-lg absolute right-0 -top-2"
              >
                <FiTrash size={18} color="#fff" />
              </button>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
