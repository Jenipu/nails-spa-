import { useMatches } from 'react-router-dom'

export function Breadcrumbs() {
  let matches = useMatches()
  let crumbs = matches
    .filter((match) => Boolean(match.handle?.crumb))
    .map((match) => match.handle.crumb(match.data));

  return (
    <ol className='w-full flex gap-2 [&>*]:text-gray-900 [&>*]:text-2xl [&>*]:font-medium'>
      {crumbs.map((crumb, index) => (
        <li key={index}>{crumb}</li>
      ))}
    </ol>
  );
}