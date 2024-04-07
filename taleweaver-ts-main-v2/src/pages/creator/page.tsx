import CreatorForm from './form';

export default function CreatorPage() {
  return (
    <div className="container-xxl px-2">
      <div className="mb-5">
        <h1>
          Creators dashboard
        </h1>
        <p className="px-2 mt-4">
          Create a new world and share it with your fellow tale-weavers.
        </p>
      </div>
      <CreatorForm />
    </div>
  );
}
