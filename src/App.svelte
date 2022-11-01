<script>
  import "carbon-components-svelte/css/g90.css";
  import { Button, Modal } from "carbon-components-svelte";
  import { collection, doc, getDocs, query, where } from "firebase/firestore";
  import { onMount } from "svelte";
  import { db, app } from "./Firebase";

  let event;
  let open = false;

  onMount(async () => {
    const eventsRef = collection(db, "events");
    const q = query(eventsRef, where("title", "==", "Inaugural Bagel Run!"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      event = doc.data();
      console.log(doc.data());
    });
  });
</script>

<main>
  <h1>bagelrun</h1>
  {#if event}
    <span>
      <h2>{event.title}</h2>
      <h3>
        opening {new Date(event.start_date * 1000).toDateString()} (lol bad date)
      </h3>
      <h3>
        from <a target="_blank" rel="noreferrer" href={event.vendor.website_url}
          >{event.vendor.name}</a
        >, {event.vendor.location}
      </h3>
      <h3>${event.price_per_dozen}/dz</h3>
      <ul>
        {#each event.varieties as variety}
          <li>{variety}</li>
        {/each}
      </ul>
    </span>
  {:else}
    <p>loading...</p>
  {/if}
  <Button on:click={() => (open = true)}>Create database</Button>
  <Modal
    bind:open
    modalHeading="Create database"
    primaryButtonText="Confirm"
    secondaryButtonText="Cancel"
    on:click:button--secondary={() => (open = false)}
    on:open
    on:close
    on:submit
  >
    <p>Create a new Cloudant database in the US South region.</p>
  </Modal>
</main>

<style>
</style>
