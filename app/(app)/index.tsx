import { Button, IconButton } from "@/components/Buttons";
import { Text } from "@/components/ui/Text";
import { auth } from "@/services";
export default function Index() {

  return (
    <>
      <Text>
        Hello World
      </Text>
      <IconButton />
      <Button
        onPress={() => auth.onGoogleSignin()}
      >
        Heey
      </Button>
    </>
  )
}