<script>
  import { onMount } from 'svelte';

  let users = [];
  let search = "";
  let filter = "";
  let loading = true;
  let error = null;

  onMount(async () => {
    await loadUsers();
  });

  async function loadUsers() {
    loading = true;
    error = null;
    try {
      const res = await fetch("http://localhost/APIs/api.php");
      if (!res.ok) throw new Error(`API Error: ${res.status} ${res.statusText}`);
      const data = await res.json();
      users = data; // adjust if API wraps array
    } catch (err) {
      console.error("Failed to load users", err);
      error = err.message;
    } finally {
      loading = false;
    }
  }

  async function deleteUser(id) {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      await fetch(`http://localhost/APIs/api.php/${id}`, { method: 'DELETE' });
      users = users.filter(u => u.id !== id);
    } catch (err) {
      console.error('Delete failed', err);
      alert('Failed to delete user');
    }
  }

  async function updateUser(user) {
    const name = prompt('Enter new name', user.name);
    const email = prompt('Enter new email', user.email);
    const phone = prompt('Enter new phone', user.phone);
    const address = prompt('Enter new address', user.address);
    if (!name || !email || !phone || !address) return;

    const updatedUser = { ...user, name, email, phone, address };

    try {
      await fetch(`http://localhost/APIs/api.php/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser)
      });
      users = users.map(u => u.id === user.id ? updatedUser : u);
    } catch (err) {
      console.error('Update failed', err);
      alert('Failed to update user');
    }
  }

  function exportCSV() {
    const csvContent = ["id,name,email,phone,address", ...users.map(u => `${u.id},${u.name},${u.email},${u.phone},${u.address}`)].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'users.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  $: filtered = users.filter(u => {
    const s = search.toLowerCase();
    return (
      (!filter || u.name.toLowerCase().includes(filter.toLowerCase())) &&
      (u.name.toLowerCase().includes(s) ||
       u.email.toLowerCase().includes(s) ||
       u.phone.toLowerCase().includes(s) ||
       u.address.toLowerCase().includes(s))
    );
  });
</script>

<div class="min-h-screen bg-gray-100 flex flex-col items-center p-6">
  <h1 class="text-2xl font-semibold mb-4">User Records (API Connected)</h1>

  {#if error}
    <div class="w-full max-w-3xl text-center text-red-600 font-semibold py-10">
      {error}
    </div>
  {:else}
    <div class="w-full max-w-3xl flex gap-3 mb-6">
      <input type="text" placeholder="Search..." bind:value={search} class="w-full p-2 rounded border border-gray-300" />
      <input type="text" placeholder="Filter by name..." bind:value={filter} class="w-1/3 p-2 rounded border border-gray-300" />
      <button on:click={exportCSV} class="p-2 bg-blue-500 text-white rounded">Export CSV</button>
    </div>

    <div class="w-full max-w-3xl bg-white shadow rounded p-4">
      <table class="w-full text-left">
        <thead>
          <tr class="border-b">
            <th class="py-2">ID</th>
            <th class="py-2">Name</th>
            <th class="py-2">Email</th>
            <th class="py-2">Phone</th>
            <th class="py-2">Address</th>
            <th class="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {#if loading}
            <tr><td colspan="6" class="py-3 text-center text-gray-500">Loading...</td></tr>
          {:else if filtered.length === 0}
            <tr><td colspan="6" class="py-3 text-center text-gray-500">No results found</td></tr>
          {/if}

          {#each filtered as u}
            <tr class="border-b hover:bg-gray-50 transition">
              <td class="py-2">{u.id}</td>
              <td class="py-2">{u.name}</td>
              <td class="py-2">{u.email}</td>
              <td class="py-2">{u.phone}</td>
              <td class="py-2">{u.address}</td>
              <td class="py-2 flex gap-2">
                <button on:click={() => updateUser(u)} class="text-blue-500">Edit</button>
                <button on:click={() => deleteUser(u.id)} class="text-red-500">Delete</button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>
