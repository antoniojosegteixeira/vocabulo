import { raw } from "../utils/wordData";

export default function Home() {
  const array = raw.sort((a, b) => 0.5 - Math.random());
  console.log(array);

  return <div>Vocabulo</div>;
}
