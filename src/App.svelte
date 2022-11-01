<script>
  import "carbon-components-svelte/css/g90.css";
  import { collection, doc, getDocs, query, where } from "firebase/firestore";
  import { onMount } from "svelte";
  import { db, app } from "./Firebase";
  import {
    Form,
    FormGroup,
    Checkbox,
    RadioButtonGroup,
    RadioButton,
    Select,
    SelectItem,
    Button,
    Modal,
  } from "carbon-components-svelte";

  let event;
  let open = false;

  let num_bagels_selected;

  let answer = "";

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
    <Button on:click={() => (open = true)}>Join the run</Button>
    <Modal
      bind:open
      modalHeading="{event.vendor.name} Bagel Run"
      primaryButtonText="Confirm"
      secondaryButtonText="Cancel"
      on:click:button--secondary={() => (open = false)}
      on:open
      on:close
      on:submit={(e) => {
        e.preventDefault();
        console.log("submit", e);
      }}
    >
      <Form>
        <FormGroup legendText="# of dozen">
          <Select>
            <SelectItem value="option-1" text="1" />
            <SelectItem value="option-2" text="2" />
            <SelectItem value="option-3" text="3" />
          </Select>
        </FormGroup>
      </Form>
    </Modal>
  {:else}
    <p>loading...</p>
  {/if}
</main>

<style>
</style>
