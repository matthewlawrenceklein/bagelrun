<script>
  import { collection, doc, getDocs, query, where } from "firebase/firestore";
  import { onMount } from "svelte";
  import { db, app } from "./Firebase";

  let event;

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
</main>

<style>
</style>
