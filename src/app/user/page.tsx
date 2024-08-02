import { GetServerSideProps } from "next";
import UserProfile from "../components/userProfile";
import { getUserDataByUsername } from "../../../firebase"; // Assume this function fetches user data by username

const UserProfilePage = ({ userData }: { userData: any }) => {
  return <UserProfile userData={userData} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { username } = context.params!;
  try {
    const userData = await getUserDataByUsername(username as string);
    return {
      props: { userData },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
};

export default UserProfilePage;
