import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {
  Grid,
  Typography,
} from "@mui/material";
import SearchBar from "./components/Search";
import React, { useEffect, useState } from "react";
import GithubSvg from "./components/assets/GithubSvg";
import RepoCard from "./components/RepoCard";
import { Repo } from "./interfaces/repo";

const fetchRepositories = async (query: string):Promise<{items:Repo[]; total_count : number}> => {
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

  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl">
        <Box sx={{ bgcolor: "#0e1117", minHeight: "100vh" }} className="main">
          {/* <Typography variant="h3">Github</Typography> */}
          <Box sx={{ marginBottom: "20px" }}>
            <GithubSvg />
          </Box>
          <SearchBar
            handleSearch={handleSearch}
            // searchInput={searchInput}
            // setSearchInput={setSearchInput}
            isLoading={isLoading}
          />
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
        <Grid container spacing={4} sx={{ maxWidth: "960px", marginTop:"20px", marginBottom:"30px" }}> 
          {!isLoading &&
            repos.items?.length > 0 &&
            repos.items.map((item) => 
                <Grid item xs={6}>
                    <RepoCard key={item.id} item={item} />
                </Grid>
            )}
        </Grid>
        </Box>
      </Container>
    </>
  );
};

export default MainPage;
