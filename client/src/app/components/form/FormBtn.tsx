import BigBtn from "../buttons/Big";
import Loading from "../Loading";

interface TProps {
  text: string;
  isLoading: boolean;
}

export default function FormBtn({ isLoading, text }: TProps) {
  return (
    <BigBtn className={`w-full ${isLoading ? "cursor-wait" : ""}`}>
      {isLoading ? (
        <div className="flex w-full items-center justify-center">
          <div className="relative h-[1.5rem] w-[1.5rem]">
            <Loading
              childStyle={{
                borderColor: "white",
                borderTopColor: "transparent",
              }}
            />
          </div>
        </div>
      ) : (
        <div>{text}</div>
      )}
    </BigBtn>
  );
}
