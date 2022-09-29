import type { NextPage } from "next"
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  Heading,
  Spacer,
  Stack
} from '@chakra-ui/react'

interface game {
  date: string,
  id: number,
  leagueID: number,
  loser: number,
  winner: number
}

const RequestViewDashboard: NextPage = () => {
  const router = useRouter();
  const lid = 1;
  const { query } = router.query;

  const [games, setGames] = useState([]);
  const [names, setNames] = useState(null)

  const getName = (id: number) => names != null ? names[id] : "";

  const Row = ({ date, id, loser, winner }: game) => (
    <Tr>
      <Td>{id}</Td>
      <Td >{getName(winner)}</Td>
      <Td>{getName(loser)}</Td>
      <Td>{new Date(date).toLocaleString()}</Td>

    </Tr>

  )

  useEffect(() => {
    (async () => {
      if (query !== null && query !== undefined) {
        await fetch(`${process.env.NEXT_PUBLIC_URL}/person/games/${query}/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json; encoding=utf=8",
          },
          body: JSON.stringify({
            password: process.env.NEXT_PUBLIC_PASSWORD,
          }),
        })
          .then((response) => response.json())
          .then((dat) => setGames(dat))
      }

    })()

  }, [query])

  useEffect(() => {
    (async () => {
      await fetch(`${process.env.NEXT_PUBLIC_URL}/person/names/${lid}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; encoding=utf=8",
        },
        body: JSON.stringify({
          password: process.env.NEXT_PUBLIC_PASSWORD
        })
      })
        .then((response) => response.json())
        .then((dat) => setNames(dat))
    })()
  }, [])

  return (
    <Box maxWidth="100%">
      <Stack direction="row">
        <Spacer />
        <a href="/">
          <Heading pt="5" pb="5" >
            Official Chess Rankings
          </Heading>
        </a>
        <Spacer />
      </Stack>
      <TableContainer>
        <Table variant='simple'>
          <TableCaption>Official Chess Rankings</TableCaption>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Winner</Th>
              <Th>Loser</Th>
              <Th>Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {games.map((point: game) => <Row key={point.id} {...point} />)}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>

  )

}
export default RequestViewDashboard;
