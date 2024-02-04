import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Grid, Link, Typography } from "@mui/material";
import SearchBar from "./components/Search";
import React, { useState } from "react";
import GithubSvg from "./app/assets/GithubSvg";
import RepoCard from "./components/RepoCard";
import { Repo } from "./app/interfaces/repo";
import { STORAGE } from "./app/services/localstorage.services";
import { formatNumber } from "./app/utils/number.utils";

const fetchRepositories = async (
  query: string
): Promise<{ items: Repo[]; total_count: number }> => {
  try {
    if (query.trim() === "") {
      return { items: [], total_count: 0 };
    }
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${query}`
    );
    const data = await response.json();
    return data || { items: [], total_count: 0 };
  } catch (error) {
    console.error("error: " + error);
    return { items: [], total_count: 0 };
  }
};

const MainPage: React.FC = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [repos, setRepos] = useState<{ items: Repo[]; total_count: number }>({
    items: [],
    total_count: 0,
  });
  const [favRepo, setFavRepo] = useState<number[]>([]);

  // search for repo
  const handleSearch = async (query: string) => {
    setLoading(true);
    const data = await fetchRepositories(query);
    setRepos({
      items: data.items,
      total_count: data.total_count,
    });
    setLoading(false);
  };

  //   handle add to fav
  const handleAddToFav = (item: Repo) => {
    let newFavs = [...favRepo];
    const isExist = favRepo.some((i) => i == item.id);
    if (!isExist) {
      newFavs.push(item.id);
    } else {
      newFavs = favRepo.filter((i) => i != item.id);
    }
    setFavRepo(newFavs);
    const getFullDetails = repos?.items.filter((data) =>
      newFavs.includes(data.id)
    );
    STORAGE.set("favorite", JSON.stringify(getFullDetails));
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl">
        <Box sx={{ bgcolor: "#0e1117", minHeight: "100vh" }} className="main">
          <Box sx={{ marginBottom: "20px" }}>
            <GithubSvg />
          </Box>
          <SearchBar handleSearch={handleSearch} isLoading={isLoading} />
          {!isLoading && repos.items?.length === 0 && (
            <>
              <Typography sx={{ marginTop: "30px" }}>
                Welcome to the GitHub Repo Finder!
                <br />
                This application allows you to find a repository on Github by
                providing its name. Just type in the repository's name and hit
                enter.
                <br />
              </Typography>
              <div className="img-container">
                <img src="/assets/home-desktop-dark2x.webp" alt="Github Wall" />
              </div>
            </>
          )}

          <Grid
            container
            sx={{
              maxWidth: "960px",
              marginTop: "10px",
            }}
          >
            {!isLoading && repos.total_count !== 0 && (
              <Grid item xs={6}>
                <Typography sx={{ textAlign: "left" }}>
                  Search Results : {formatNumber(repos.total_count)}
                </Typography>
              </Grid>
            )}
            {!isLoading && (
              <Grid item xs={6}>
                <Link sx={{ float: "right", cursor:"pointer" }}>Favourite Repo</Link>
              </Grid>
            )}
          </Grid>
          <Grid
            container
            spacing={2}
            columns={{ xs: 4, sm: 8, md: 12 }}
            sx={{ maxWidth: "960px", marginTop: "20px", marginBottom: "30px" }}
          >
            {!isLoading &&
              repos.items?.length > 0 &&
              repos.items.map((item) => (
                <Grid item xs={4} sm={4} md={6}>
                  <RepoCard
                    key={item.id}
                    item={item}
                    handleAddToFav={handleAddToFav}
                    isFav={favRepo.includes(item.id)}
                  />
                </Grid>
              ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default MainPage;
