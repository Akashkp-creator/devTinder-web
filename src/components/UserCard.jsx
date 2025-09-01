const UserCard = ({ feed }) => {
  // console.log(feed);
  const { photoUrl: image, age, gender, firstName, lastName, about } = feed;
  return (
    <div className="card bg-base-500 w-96 shadow-xl mb-4">
      <figure>
        <img src={image} alt="Shoes" className="max-h-60 w-fit" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{`${firstName}  ${lastName}`}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about}</p>
        <div className="card-actions justify-center my-4">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};
export default UserCard;
