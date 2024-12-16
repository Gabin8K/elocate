import { Button, IconButton } from "@/components/Buttons";
import { Text } from "@/components/ui/Text";
import { useToast } from "@/hooks";


export default function Index(){
  const toast = useToast()

  return (
    <>
    <Text>
      Hello World
    </Text>
    <IconButton  />
    <Button
      onPress={() => toast.show('Hello World')}
    >
      Heey
    </Button>
    </>
  )
}