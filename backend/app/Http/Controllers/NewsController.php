<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class NewsController extends Controller
{
    public function index()
    {
        $newsApiUrl = 'https://newsapi.org/v2/top-headlines?country=us&apiKey='.env('NEWSAPI_KEY');
        $guardianApiUrl = 'https://content.guardianapis.com/search?api-key='.env('GUARDIAN_API_KEY');
        $nytApiUrl = 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key='.env('NYT_API_KEY');

        $newsApiResponse = Http::get($newsApiUrl)->json();
        $guardianApiResponse = Http::get($guardianApiUrl)->json();
        $nytApiResponse = Http::get($nytApiUrl)->json();

        $newsApiData = $this->extractNewsData($newsApiResponse['articles'], 'title', 'description', 'urlToImage', 'url', 'publishedAt');
        $guardianApiData = $this->extractNewsData($guardianApiResponse['response']['results'], 'webTitle', 'webTitle', 'fields.thumbnail', 'webUrl', 'webPublicationDate');
        $nytApiData = $this->extractNewsData($nytApiResponse['results'], 'title', 'abstract', 'multimedia[0].url', 'url', 'published_date');

        $data = [
            'newsApiData' => $newsApiData,
            'guardianApiData' => $guardianApiData,
            'nytApiData' => $nytApiData,
        ];

        return response()->json($data);
    }

    private function extractNewsData($data, $titleKey, $descriptionKey, $imageKey, $linkKey, $dateKey)
    {
        $extractedData = [];

        foreach ($data as $item) {
            $extractedItem = [
                'title' => $item[$titleKey],
                'description' => $item[$descriptionKey],
                'image' => isset($item[$imageKey]) ? $item[$imageKey] : null,
                'link' => $item[$linkKey],
                'date' => $item[$dateKey],
            ];
            $extractedData[] = $extractedItem;
        }

        return $extractedData;
    }
}
