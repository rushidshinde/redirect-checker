import React from 'react';
import { Result } from '@/payload-types'
import {RedirectStatus} from "@/lib/types";
import {Button} from "@/components/ui/button";
import {BadgeAlert, BadgeCheck, BadgeX, Grid2x2, LayoutList} from "lucide-react";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";

interface StatFilterProps {
  results: Result["redirects"];
  activeFilter: 'all' | RedirectStatus;
  setActiveFilter: (filter: 'all' | RedirectStatus) => void;
  resultView: 'grid' | 'list';
  setResultView: (view: 'grid' | 'list') => void;
}

export default function StatFilter({ results, activeFilter, setActiveFilter, resultView, setResultView }: StatFilterProps) {
  const totalCount = results?.length;
  const successCount = results?.filter(result => result.status === RedirectStatus.SUCCESS).length;
  const failureCount = results?.filter(result => result.status === RedirectStatus.FAILURE).length;
  const warningCount = results?.filter(result => result.status === RedirectStatus.WARNING).length;
  return (
    <div className="flex flex-wrap gap-4 justify-between items-center mb-4">
      <div className="flex flex-wrap gap-4 justify-start items-center">
        <Button
          variant={`${activeFilter === 'all' ? 'default' : 'secondary'}`}
          onClick={() => setActiveFilter('all')}
        >
          All ({totalCount})
        </Button>
        <Button
          variant={`${activeFilter === RedirectStatus.SUCCESS ? 'default' : 'secondary'}`}
          onClick={() => setActiveFilter(RedirectStatus.SUCCESS)}
          disabled={successCount === 0}
        >
          <BadgeCheck className={`${activeFilter === RedirectStatus.SUCCESS ? 'text-emerald-600' : ''}`}/>
          Success ({successCount})
        </Button>
        <Button
          variant={`${activeFilter === RedirectStatus.FAILURE ? 'default' : 'secondary'}`}
          onClick={() => setActiveFilter(RedirectStatus.FAILURE)}
          disabled={failureCount === 0}
        >
          <BadgeX className={`${activeFilter === RedirectStatus.FAILURE ? 'text-red-600' : ''}`} />
          Failure ({failureCount})
        </Button>
        <Button
          variant={`${activeFilter === RedirectStatus.WARNING ? 'default' : 'secondary'}`}
          onClick={() => setActiveFilter(RedirectStatus.WARNING)}
          disabled={warningCount === 0}
        >
          <BadgeAlert className={`${activeFilter === RedirectStatus.WARNING ? 'text-yellow-600' : ''}`}/>
          Warning ({warningCount})
        </Button>
      </div>
      <div className="">
        <ToggleGroup type="single">
          {
            resultView === 'list' ?
              <>
                <ToggleGroupItem
                  value="grid"
                  onClick={()=>{setResultView('grid')}}
                  variant={'outline'}
                  className="cursor-pointer"
                >
                  <Grid2x2 />
                </ToggleGroupItem>
              </>
              :
              <>
                <ToggleGroupItem
                  value="list"
                  onClick={()=>{setResultView('list')}}
                  variant={'outline'}
                  className="cursor-pointer"
                >
                  <LayoutList />
                </ToggleGroupItem>
              </>
          }
        </ToggleGroup>
      </div>
    </div>
  )
}