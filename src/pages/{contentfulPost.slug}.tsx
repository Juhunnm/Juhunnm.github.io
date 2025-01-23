import { PageProps } from 'gatsby'

export default function Post({ params }: PageProps) {
  return <div>{params.slug}</div>
}
