<script>
  import {format} from 'date-fns'
  const thisyear = format(new Date(),'yyyy')
  const year = thisyear != '2021' ? `2021-${thisyear}` : thisyear
</script>
<footer>
	<p>© {year}, Built with Sanity &amp; SvelteKit</p>
</footer>

<style>
  
	footer {
    border-top: 2px solid var(--color-gray-very-light);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 4em;
    margin-top: 3em;
	}
</style>