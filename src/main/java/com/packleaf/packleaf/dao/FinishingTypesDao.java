package com.packleaf.packleaf.dao;

import com.packleaf.packleaf.entity.FinishingTypes;
import com.packleaf.packleaf.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FinishingTypesDao extends JpaRepository<FinishingTypes, Integer> {



    @Query(value = "select fts from FinishingTypes fts where fts.id not in (select jmhfy.finishing_types_id.id from JobMasterHasFinishingTypes jmhfy where jmhfy.jobmaster_id.id=?1) order by fts.id asc")
    public List<FinishingTypes> getJobWithoutItems(Integer jobmasterId);



}
