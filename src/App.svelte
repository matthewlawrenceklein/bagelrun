<script>
  import "carbon-components-svelte/css/g90.css";
  import { collection, doc, getDocs, query, where } from "firebase/firestore";
  import { onMount } from "svelte";
  import { db, app } from "./Firebase";
  import {
    Button,
    Modal,
    TextInput,
    Loading,
    Tile,
  } from "carbon-components-svelte";

  let event;
  let open = false;
  let numDozenSelected = 0;
  let dzn_1, dzn_2, dzn_3;
  let venmo;

  onMount(async () => {
    const eventsRef = collection(db, "events");
    const q = query(eventsRef, where("title", "==", "Inaugural Bagel Run!"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      event = doc.data();
    });
  });
</script>

<main>
  {#if event}
    <h1>bagelrun</h1>
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
    <Button on:click={() => (open = true)}>Join the run</Button>
    <Modal
      bind:open
      modalHeading="{event.vendor.name} Bagel Run"
      primaryButtonText="Confirm"
      secondaryButtonText="Cancel"
      on:click:button--secondary={() => (open = false)}
      on:open
      on:close
      on:submit
    >
      <div>
        <label for="dozen_select">Select # dozen</label>
        <select id="dozen_select" bind:value={numDozenSelected}>
          <option selected disabled value="placeholder-item"
            >Choose # of dozen</option
          >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
      {#each { length: numDozenSelected } as _, i}
        <span>
          <select on:change={() => console.log()}>
            {#each event.varieties as variety}
              <option value={variety}>{variety}</option>
            {/each}
          </select>
        </span>
      {/each}
      <div>
        <TextInput labelText="who are ya" placeholder="Enter your name..." />
        <TextInput
          labelText="venmo address"
          helperText="I'll send a payment req once the bagels have been ordered"
          placeholder="Enter your venmo..."
        />
        <TextInput labelText="secret passcode" placeholder="passcode" />
      </div>
      <div>
        <Tile light>
          <h3>
            Total: ${numDozenSelected * event.price_per_dozen}.00
          </h3>
        </Tile>
      </div>
    </Modal>
  {:else}
    <Loading />
  {/if}
</main>

<style>
</style>
